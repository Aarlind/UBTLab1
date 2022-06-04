using CarRental.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.ConstrainedExecution;
using System.IO;
using Microsoft.AspNetCore.Hosting;

    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;
        public CarController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
        select * from Cars
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
        public JsonResult Post(Cars car)
        {
            string query = @"
            insert into Cars
            (VIN, Car_Description, Model, Brand, Color, Purchase_Date, Category_ID)     
            values (@VIN, @Car_Description, @Model, @Brand, @Color, @Purchase_Date, @Category_ID)";
            
         /*   (
            '" + car.VIN +@"',
            '" + car.Car_Description+ @"'
            , '" + car.Model + @"'
            , '" + car.Brand + @"'
            , '" + car.Color + @"'
            , '" + car.Purchase_Date + @"'
            , '" + car.Category_ID + @"'
            )
            "; 
        */

             DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {



                myCommand.Parameters.AddWithValue("@Model", car.Model);
                myCommand.Parameters.AddWithValue("@Color", car.Color);
                myCommand.Parameters.AddWithValue("@Brand", car.Brand);
                myCommand.Parameters.AddWithValue("@Car_Description", car.Car_Description);
                myCommand.Parameters.AddWithValue("@Category_ID", car.Category_ID);
                myCommand.Parameters.AddWithValue("@Purchase_Date", car.Purchase_Date);
                myCommand.Parameters.AddWithValue("@VIN", car.VIN);
                myReader = myCommand.ExecuteReader();
                    
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eshte shtuar me sukses!");
        }

        [HttpPut]
        public JsonResult Put(Cars car)
        {
            string query = @"
            update Cars set Model = @Model, Brand=@Brand, Category_ID=@Category_ID, Purchase_Date=@Purchase_Date, Color = @Color, Car_Description = @Car_Description where VIN = @VIN";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                myCommand.Parameters.AddWithValue("@Model", car.Model);
                myCommand.Parameters.AddWithValue("@Color", car.Color);
                myCommand.Parameters.AddWithValue("@Brand", car.Brand);
                myCommand.Parameters.AddWithValue("@Car_Description", car.Car_Description);
                myCommand.Parameters.AddWithValue("@Category_ID", car.Category_ID);
                myCommand.Parameters.AddWithValue("@Purchase_Date", car.Purchase_Date);
                myCommand.Parameters.AddWithValue("@VIN", car.VIN);



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
            delete from Cars where VIN = @VIN";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VIN", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eshte fshire me sukses!");
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

            using(var stream = new FileStream(physicalPath, FileMode.Create))
            {
                postedFile.CopyTo(stream);
            }

            return new JsonResult(filename);
        }
        catch (Exception)
        {

            return new JsonResult("anonymous.png");
        }
    }
    [Route("GetAllCarsNames")]
    public JsonResult GetAllDepartmentNames()
    {
        string query = @"
                    select Model from dbo.Cars
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
                table.Load(myReader); ;

                myReader.Close();
                myCon.Close();
            }
        }

        return new JsonResult(table);
    }
}


