class Parcel:
    def __init__(self, customer_name, delivery_address, contact_number, parcel_size, parcel_weight, tracking_id=None):
        self.customer_name = customer_name
        self.delivery_address = delivery_address
        self.contact_number = contact_number
        self.parcel_size = parcel_size
        self.parcel_weight = parcel_weight
        self.tracking_id = tracking_id
