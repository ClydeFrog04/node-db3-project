-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select "p"."ProductName", c.CategoryName
from "Product" as "p"
join "Category" as "c" on "p".CategoryId = "c".Id;
--or
select "p"."ProductName", c.CategoryName
from "Category" as "c"
join "Product" as "p" on "c".Id = "p".CategoryId;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select "o"."Id", "s"."CompanyName"
from "Order" as "o"
join "Shipper" as "s" on "o"."ShipVia" = "s"."Id"
where "OrderDate" < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select "o"."Quantity", "p"."ProductName"
from "OrderDetail" as "o"
join "Product" as "p" on "o"."ProductId" = "p"."Id"
where "o"."OrderId" = 10251
order by "p"."ProductName";

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly.
-- Displays 16,789 records.
--it didn't as for first and last name but I thought it was good practice to add it
select "o"."Id", "c"."CompanyName", "e"."FirstName" || " " || "e"."LastName" as "EmployeeName"
from "Order" as "o"
join "Customer" as "c" on "o"."CustomerId" = "c"."Id"
join "Employee" as "e" on "o"."EmployeeId" = "e"."Id";