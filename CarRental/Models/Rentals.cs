namespace CarRental.Models
{
    public class Rentals
    {
        public int ReservationNumber { get; set; }
        public int Amount { get; set; }
        public int PickupDate { get; set; }
        public int ReturnDate { get; set; }
        public int VIN { get; set; }
        public int CustomerID { get; set; }
        public string PickupLocation { get; set; }
        public string ReturnLocation    { get; set; }
    }
}
