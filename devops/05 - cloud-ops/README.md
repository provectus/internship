## Prerequsite

* AWS free tier account https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

DISCLAIMER: Tasks in this section could be charcheable. Don't keep working resources alone - terminate it. 
Use free tier features and secure your account properly. Deactivate your AWS account if you aren't going 
to use it in the future 

https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all


## Tasks

* Create an AWS account and protect the root user with MFA https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa [Done](https://photos.app.goo.gl/gP8AWJXkFveDtpQL9)

* Create an EC2 instance, connect to it through SSH and install apache or nginx manually, terminate it then. [Done](https://photos.app.goo.gl/QqKB3PWgg65WQyjH7)

* Create an EC2 instance, provision software (apache/nginx) using Cloudformation, validate the installation, finally delete the stack. 
  Provide the resulting template as outcome of this task.
  - I managed to learn how to write a template for the EC2 intance but I have problem finding material on how to install solfware on the EC2 instance from the yaml file, I could SSH into the instance and install it manually but I guess that's not the point of this task or I've missunderstod the task

* (*) Given that we have a properly written Cloudformation template come up with an idea how we 
  can create and update a cloudformation stack based on this template automatically. Try to implement it.

## Questions

1. What the benefits of the cloud computing? Reduced cost of owning hardward and cut down on staffs to maintain those hardwares, can scale up or down with ease, protected from natural disaster because most cloud computing services are located in safe locations, easy of colboration,...

2. What is the Infrastructure As Code? Pros/cons of it? Infrastructure As Code (IaC) is a concept in which manual, repetitive steps of setting up infrastructures, maintaining infrastructures, setting up applications, maintaining applications,... are automated by putting all these steps in a script. Pros: reproducible infrastructure in development and in testing, configurations is documented in the script,... Cons: extra cost of creating multiple copies of the infrastructures, additional complexity,...


