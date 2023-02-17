Frontend Pages
- /resigter     User registration page
- /login        User login page
- /             Gps summary page
- /device/:id   Gps detail page


Backend APIs
Create User /register
    input:
        firstName (string)
        lastName (string)
        username (string)
        password (string)
        dateOfBirth (date)
        contactNo (integer)
    output:
        error (string): Empty string means success
Login user /login
    input
        username
        password
    output
        error (string): Empty string means success
ListAircraftSummary: /list_all_locations ListAllLocations
    input
        (user) (not included, as no user based info needed)
        deviceIdPrefix (string)
        deviceTypePrefix (string)
        pageSize (int)
        pageOffset (int)
    output
        matching rows (rows)
GetAircraftDetails: /get_aircraft_locations GetAircraftLocations
    input
        DeviceId 
        DeviceType
    output
        List of pairs (timestamp, location)



Note: User is logged in until user manually log out, or refresh page.
