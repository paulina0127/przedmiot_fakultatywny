# Specializations

### GET, POST: /specializations

Returns list of all specializations

### GET, PUT, DELETE: /specializations/{id}

Returns a single specialization

### Parameters

#### search: {name}

#### ordering: id

# Schedules

### GET, POST: /schedules

Returns list of all schedules

### GET, PUT, DELETE: /schedules/{id}

Returns a single schedule

### Parameters

#### doctor: {id}

#### start_date: {date}

#### ordering: id, start_date

# Doctors

### GET: /doctors

Returns list of all doctors

### GET: /doctors/{id}

Returns a single doctor

### Parameters

#### specializations: {id}

#### search: {first name, last name}

#### ordering: id

# Patients

### GET, POST: /patients

Returns list of all patients

### GET, PUT, DELETE: /patients/{id}

Returns a single patient

### Parameters

#### doctor: {id}

#### search: {first name, last name, pesel}

#### ordering: id, birthdate

# Appointments

### GET, POST: /appointments

Returns list of all appointments

### GET, PUT, DELETE: /appointments/{id}

Returns a single appointment

### Parameters

#### status: {name}

#### doctor: {id}

#### patient: {id}

#### search: {patient's first name, patient's last name, patient's pesel}

#### ordering: id, date

# Prescriptions

### GET, POST: /prescriptions

Returns list of all prescriptions

### GET, PUT, DELETE: /prescriptions/{id}

Returns a single prescription

### Parameters

#### appointment: {id}

#### ordering: id, created_at

# Available slots

### GET: /slots

### Parameters

#### period: {name}

- day: returns statistics for current day
- month: returns statistics for current month
- year returns statistics for current year

#### start_date: {date}

#### end_date: {date}

# Patient statistics

### GET: /patient_stats

Returns all time patient statistics

### Parameters

#### period: {name}

- day: returns statistics for current day
- month: returns statistics for current month
- year returns statistics for current year

#### start_date: {date}

#### end_date: {date}

# Appointment statistics

### GET: /appointment_stats

Returns all time appointment statistics

### Parameters

#### period: {name}

- day: returns statistics for current day
- month: returns statistics for current month
- year returns statistics for current year

#### start_date: {date}

#### end_date: {date}
