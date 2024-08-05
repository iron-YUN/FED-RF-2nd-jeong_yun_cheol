-- https://www.w3schools.com/mysql/trymysql.asp?filename=trysql_select_columns

-- 주석
-- DB는 크게 2가지 DDL / DML 
-- DMK 은 크루드! CRUD creat(insert) / read(select) / update / delete
-- [select 선택항목 from 테이블명 where 조건절]
-- SELECT * FROM Customers;
-- SELECT city FROM Customers;
-- SELECT ContactName,city FROM Customers;
-- SELECT ContactName,city FROM Customers where city="Madrid";
-- like 검색하기 %있는 부분이 자유로운(아무문자) 부분임!
-- select * from Customers where city like "a%";
-- select * from Customers where city like "%co%";
select * from Customers where city like "%n";