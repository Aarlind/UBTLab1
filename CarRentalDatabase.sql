create Database CarRental 
use CarRental

create table Car_Category (
Category_ID int PRIMARY KEY ,
Label varchar(255),
Car_Description varchar(255),
);
select * from Car_Category
 insert into Car_Category ( Label, Category_ID) values('Audi', '1');
  insert into Car_Category ( Label, Category_ID) values('SUV', '2');
   insert into Car_Category ( Label, Category_ID) values('VAN', '3');
   UPDATE Car_Category SET Category_ID = 2 e
 insert into Cars (VIN, Car_Description, Model, Brand, Color, Purchase_Date, Category_ID) values(1234521, '5.0Benz', 'A4', 'Audi', 'Zeze', '05-05-01', 1);
 insert into Cars (VIN, Car_Description, Model, Brand, Color, Purchase_Date, Category_ID) values(2234326, '2.0Diesel', 'X1', 'BMW', 'Bardhe', '02-05-2021', 2);
 insert into Cars (VIN, Car_Description, Model, Brand, Color, Purchase_Date, Category_ID) values(5232529, '2.5 Diesel', 'A4', 'Opel', 'Bardhe', '01-05-2022', 3);
 insert into Cars (VIN, Car_Description, Model, Brand, Color, Purchase_Date, Category_ID) values(3253523, '4.2', 'A8L', 'Audi', 'Jeshile', '05-05-2021', 1);

 select * from Cars
 
 create table Users(
	ID int identity(1,1) PRIMARY KEY,
	Emri varchar(255) not null,
	Mbiemri varchar(255) not null,
	Email varchar(255) not null,
	Password varchar(255) not null
 );
 insert into Users values('Arlind', 'Aliu', 'aa51044@ubt-uni.net', 'Arlind123');
 create table Cars(
 VIN int PRIMARY KEY,
 Car_Description varchar (255),
 Model varchar(255),
 Brand varchar(255),
 Color varchar(255),
 Purchase_Date date,
 Category_ID int NOT NULL,
 FOREIGN KEY (Category_ID) REFERENCES Car_Category(Category_ID)
 );
 ALTER TABLE Cars
ALTER COLUMN Purchase_Date varchar(255);
 select * from Cars

 
 create table Customers(
 Customer_ID int identity(1, 1) PRIMARY KEY ,
 SSN int,
 First_Name varchar(255),
 Last_Name varchar(255),
 Email varchar(255),
 Mobile_phone varchar(255),
 State varchar(255),
 Country varchar(255),
 );
 
 
 create table Location(
 Location_ID int identity(1, 1) PRIMARY KEY ,
 Street varchar(255),
 Street_Number int,
 City varchar(255),
 State varchar(255),
 Country varchar(255),
 );
 
 create table Location_Phone_Number(
 Phone_ID int identity(1, 1) PRIMARY KEY ,
 Phone_Number varchar(255),
 Location_ID int NOT NULL,
 FOREIGN KEY (Location_ID) REFERENCES Location(Location_ID)
 );
 
 create table Rentals(
 Reservation_Number int identity(1, 1) PRIMARY KEY ,
 Amount varchar(255),
 Pick_up_date date,
 Return_date date,
 VIN int  NOT NULL,
 Customer_ID int NOT NULL,
 Pick_up_location int NOT NULL,
 Return_location int NOT NULL,
 FOREIGN KEY (VIN) REFERENCES Cars(VIN),
 FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID),
 FOREIGN KEY (Pick_up_location) REFERENCES Location(Location_ID),
 FOREIGN KEY (Return_location) REFERENCES Location(Location_ID)
 );


 
 