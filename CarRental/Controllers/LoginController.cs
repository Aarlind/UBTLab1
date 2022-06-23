using CarRental.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Security.Claims;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
        select ID, Username, Mbiemri, Email, Password from Users
        ";
            DataTable table = new DataTable();
            string sqlDataSource = _config.GetConnectionString("DevConnection");
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

        [AllowAnonymous]
        [HttpPost]
        
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = Generate(user);
                return Ok(token);
               
               
            }
            return NotFound("User not Found");
            


        }

        private string Generate(UserModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Surname, user.Mbiemri),
                new Claim(ClaimTypes.Sid, user.Id)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private UserModel Authenticate(UserLogin userLogin)
        {
        
            string query = @"
                        Select Id from dbo.Users where
                        Username = '" + userLogin.Username + @"' and Password = '" + userLogin.Password + @"'";
            string query1 = @"
                        Select Username from dbo.Users where
                        Username = '" + userLogin.Username + @"' and Password = '" + userLogin.Password + @"'";
            string query2 = @"
                        Select Mbiemri from dbo.Users where
                        Username = '" + userLogin.Username + @"' and Password = '" + userLogin.Password + @"'";
            string query3 = @"
                        Select Role from dbo.Users where
                        Username = '" + userLogin.Username + @"' and Password = '" + userLogin.Password + @"'";
            string query4 = @"
                        Select Email from dbo.Users where
                        Username = '" + userLogin.Username + @"' and Password = '" + userLogin.Password + @"'";
            string query5 = @"
                        Select Password from dbo.Users where
                        Username = '" + userLogin.Username + @"' and Password = '" + userLogin.Password + @"'";



            string sqlDataSource = _config.GetConnectionString("DevConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    query = (string)myCommand.ExecuteScalar();

                }
                using (SqlCommand myCommand = new SqlCommand(query1, myCon))
                {
                    query1 = (string)myCommand.ExecuteScalar();
                    
                }
                using (SqlCommand myCommand = new SqlCommand(query2, myCon))
                {
                    query2 = (string)myCommand.ExecuteScalar();
                    
                }
                using (SqlCommand myCommand = new SqlCommand(query3, myCon))
                {
                    query3 = (string)myCommand.ExecuteScalar();
                    
                }
                using (SqlCommand myCommand = new SqlCommand(query4, myCon))
                {
                    query4 = (string)myCommand.ExecuteScalar();
                    
                }
                using (SqlCommand myCommand = new SqlCommand(query5, myCon))
                {
                    query5 = (string)myCommand.ExecuteScalar();
                    myCon.Close();
                }
            }
            /*        var currentUser = UserConstants.Users.FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower() && o.Password == userLogin.Password);
                    if (currentUser != null)
                    {
                        return currentUser;
                    }*/
            
            UserModel uM = new UserModel();
            uM.Username = query1;
            uM.Mbiemri = query2;
            uM.Id = query;
            uM.Role = query3;
            uM.Email = query4;
            uM.Password = query5;

            if (uM.Username == userLogin.Username && uM.Password == userLogin.Password)
            {
                return uM;
            }
            return null;
        }

            /*  [HttpPost]
          public JsonResult Post(User user)
          {

              string query = @"
              insert into Users
              (Emri, Mbiemri, Email, Password)
              values

              (
              '" + user.Emri + @"'
              ,'" + user.Mbiemri + @"'
              ,'" + user.Email + @"'
              ,'" + user.Password + @"'
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

                      myReader = myCommand.ExecuteReader();
                      table.Load(myReader);
                      myReader.Close();
                      myCon.Close();
                  }
              }
              return new JsonResult("Eshte shtuar me sukses!");
          }*/
            /*
                            [HttpPut]
                    public JsonResult Put(User user)
                    {
                        string query = @"
                        update dbo.Users set
                        Emri = '" + user.Username + @"', Mbiemri = '" + user.Mbiemri + @"', Email = '" + user.Email + @"', Password = '" + user.Password + @"' where ID =" + user.Id + @"";



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
                        return new JsonResult("Eshte modifikuar me sukses!");
                    }

                    [HttpDelete("{id}")]
                    public JsonResult Delete(int id)
                    {
                        string query = @"
                        delete from Users where Id = @Id";
                        DataTable table = new DataTable();
                        string sqlDataSource = _configuration.GetConnectionString("DevConnection");
                        SqlDataReader myReader;
                        using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                        {
                            myCon.Open();
                            using (SqlCommand myCommand = new SqlCommand(query, myCon))
                            {
                                myCommand.Parameters.AddWithValue("@Id", id);
                                myReader = myCommand.ExecuteReader();
                                table.Load(myReader);
                                myReader.Close();
                                myCon.Close();
                            }
                        }
                        return new JsonResult("Eshte fshire me sukses!");
                    }*/
        }
}
