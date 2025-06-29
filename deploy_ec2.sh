#!/bin/bash

# Load stage config
STAGE=$1
if [ -z "$STAGE" ]; then
  echo "Usage: ./deploy_ec2.sh <stage>"
  exit 1
fi

source ./${STAGE}_config.env

echo "🚀 Starting deployment for stage: $STAGE"

# Check .pem file
if [ ! -f "$PEM_FILE_PATH" ]; then
  echo "❌ PEM file not found: $PEM_FILE_PATH"
  exit 1
fi

# Launch EC2 instance
echo "📦 Launching EC2 instance..."
INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --count 1 \
  --instance-type $INSTANCE_TYPE \
  --key-name $KEY_NAME \
  --security-group-ids $SECURITY_GROUP \
  --subnet-id $SUBNET_ID \
  --associate-public-ip-address \
  --query 'Instances[0].InstanceId' \
  --output text)

if [ -z "$INSTANCE_ID" ]; then
  echo "❌ EC2 launch failed. Check your config."
  exit 1
fi

echo "✅ Instance launched: $INSTANCE_ID"
echo "⏳ Waiting for instance to start..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

INSTANCE_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

if [ -z "$INSTANCE_IP" ]; then
  echo "❌ Failed to retrieve public IP."
  exit 1
fi

echo "🌐 Public IP: $INSTANCE_IP"
echo "🔐 Connecting to EC2 via SSH..."

# SSH and deploy
ssh -tt -o StrictHostKeyChecking=no -i "$PEM_FILE_PATH" ubuntu@$INSTANCE_IP << EOF

  set -e
  echo "[1] Installing packages..."
  sudo apt update
  sudo apt install python3-pip nodejs npm git at -y

  echo "[2] Cloning GitHub repo..."
  git clone $REPO || true
  cd tech_eazy_fullstack_Jitesh2005

  echo "[3] Setting up backend..."
  cd tech_eazy_backend
  pip3 install -r requirements.txt
  nohup uvicorn main:app --host 0.0.0.0 --port $PORT > backend.log 2>&1 &

  echo "[4] Setting up frontend..."
  cd ../tech_eazy_frontend
  npm install
  npm run build
  sudo npm install -g serve
  nohup serve -s build -l 80 > frontend.log 2>&1 &

  echo "[5] Scheduling auto-shutdown..."
  echo "sudo shutdown -h now" | at now + 2 hours

  echo "✅ Deployment complete!"
EOF

echo "🌐 Frontend available at: http://$INSTANCE_IP/"
echo "📦 Backend available at: http://$INSTANCE_IP:$PORT/parcels"
