using CarRental.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.ConstrainedExecution;

namespace CarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

        public class CarCategoryController : ControllerBase
        {
            private readonly IConfiguration _configuration;
            public CarCategoryController(IConfiguration configuration)
            {
                _configuration = configuration;
            }




            [HttpGet]
        public JsonResult Get()
        {
            string query = @"
        select Category_ID, Label from Car_Category
        ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(CarCategory car)
        {
 /*           string query = @"
            insert into Car_Category values (@Category_ID, @Label)
        "; */

            string query = @"
            insert into Car_Category
            (Category_ID, Label)
            values

            (
            '" + car.Category_ID + @"'
            ,'"+ car.Label + @"'
            )
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
             //       myCommand.Parameters.AddWithValue("@Category_ID", car.Category_ID);
            //        myCommand.Parameters.AddWithValue("@Label", car.Label);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eshte shtuar me sukses!");
        }

        [HttpPut]
        public JsonResult Put(CarCategory car)
        {
            string query = @"
            update dbo.Car_Category set
            Label = '" + car.Label +@"' where Category_ID ="+car.Category_ID +@"";
           
      //      string query = @"update Car_Category set Label = @Label where Category_ID = @Category_ID";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Category_ID", car.Category_ID);
                    myCommand.Parameters.AddWithValue("@Label", car.Label);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eshte modifikuar me sukses!");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
            delete from Car_Category where Category_ID = @Category_ID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Category_ID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eshte fshire me sukses!");
        }

    }
}
