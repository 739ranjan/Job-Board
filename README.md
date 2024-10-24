post api/register
{
    "name": "Ranjan", 
    "email": "ranjan@gmail.com", 
    "password": "password123", 
    "role": "recruiter"
}

{
    "name": "Shashi", 
    "email": "shashi@gmail.com", 
    "password": "password123", 
    "role": "job seeker"
}

---------------------------------------
post   api/login  -> job-seeker
{
    "email": "shashi@gmail.com", 
    "password": "password123"
}

post  api/login  -> recruiter
{
    "email": "ranjan@gmail.com", 
    "password": "password123"
}

-------------------------------------
post  api/jobs -> createJob:recruiter
Header=> Authorization: Bearer <your_jwt_token provided after login>
{
    "title": "Frontend Developer",
    "description": "Looking for a full-stack software engineer",
    "companyName": "Mamsys"
}

post  api/jobs -> createJob:job seeker
Header=> Authorization: Bearer <your_jwt_token provided after login>
{
    "title": "Backend Developer",
    "description": "Looking for a full-stack software engineer",
    "companyName": "ABC"
}

------------------------------------------
get    /api/applications -> apply (job Seeker)
Header=> Authorization: Bearer <your_jwt_token provided after login>
{
  "jobId": "your_job_id",
  "resumeUrl": "http://resume.com/resume.pdf"
}

get      /api/applications -> apply (recruiter)
Header=> Authorization: Bearer <your_jwt_token provided after login>
{
  "jobId": "your_job_id",
  "resumeUrl": "http://resume.com/resume.pdf"
}


--------------------------------------------
get       /api/applications/recruiter   -> get all applications (recruiter)
Header=> Authorization: Bearer <your_jwt_token provided after login>

get       /api/applications/user   -> get all applications submitted (job seeker)
Header=> Authorization: Bearer <your_jwt_token provided after login>


---------------------------------------------
get    /api/jobs    -> get all jobs (without login)


---------------------------------------------
put     /api/jobs/:id   -> update job  (recruiter)
Header=> Authorization: Bearer <your_jwt_token provided after login>
{
  "title": "Updated Frontend",
  "description": "Updated frontend description",
  "companyName": "Updated Company Google"
}

---------------------------------------------
delete       /api/jobs/:id   -> delete job  (recruiter)
Header=> Authorization: Bearer <your_jwt_token provided after login>

