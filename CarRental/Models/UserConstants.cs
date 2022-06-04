using System.Collections.Generic;

namespace CarRental.Models
{
    public class UserConstants
    {
        public static List<UserModel> Users = new List<UserModel>()
        {
            new UserModel() { Username = "jason_admin", Mbiemri = "Admin", Email = "jason.admin@email.com", Password = "MyPass_w0rd", Id = "1",  Role = "Administrator" },
            new UserModel() { Username = "elyse_seller", Mbiemri = "Admin", Email = "elyse.seller@email.com", Password = "MyPass_w0rd", Id = "2",  Role = "Seller" },
        };
    }
}
