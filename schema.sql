# Create database
CREATE DATABASE GpsTracker;

# Use that database
USE GpsTracker;

# Creating table DeviceLogs and adding initial data as described in project.
CREATE TABLE DeviceLogs (deviceId CHAR(6) NOT NULL, deviceType VARCHAR(20) NOT NULL, timestamp DATETIME NOT NULL, location CHAR(2) NOT NULL);

INSERT INTO DeviceLogs VALUES
 ("D-1567", "Aircraft", "2022-08-31 10:05:00", "L1"),
 ("D-1567", "Aircraft", "2022-08-31 10:10:00", "L1" ),
 ("D-1567", "Aircraft", "2022-08-31 10:15:00", "L1"),
 ("D-1567", "Aircraft", "2022-08-31 10:20:00", "L1"),
 ("D-1567", "Aircraft", "2022-08-31 10:25:00", "L2"),
 ("D-1568", "Personal", "2022-08-31 10:05:00", "L3"),
 ("D-1568", "Personal", "2022-08-31 10:10:00", "L3"),
 ("D-1568", "Personal", "2022-08-31 10:15:00", "L3"),
 ("D-1568", "Personal", "2022-08-31 10:20:00", "L3"),
 ("D-1568", "Personal", "2022-08-31 10:25:00", "L3"),
 ("D-1569", "Asset", "2022-08-31 10:15:00", "L4"),
 ("D-1569", "Asset", "2022-08-31 10:20:00", "L4"),
 ("D-1569", "Asset", "2022-08-31 10:25:00", "L1"),
 ("D-1569", "Asset", "2022-08-31 10:30:00", "L1"),
 ("D-1569", "Asset", "2022-08-31 10:35:00", "L2"),
 ("D-1570", "Personal", "2022-08-31 10:35:00", "L5"),
 ("D-1571", "Asset", "2022-08-31 10:35:00", "L6");

# Creating Users table based on assumed schema.
CREATE TABLE Users (firstName VARCHAR(200) NOT NULL, lastName VARCHAR(200) NOT NULL, username VARCHAR(30) NOT NULL, password VARCHAR(200) NOT NULL, dateOfBirth DATETIME NOT NULL, contactNo BIGINT(12) NOT NULL);


