## Prerequsite

* AWS free tier account https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

DISCLAIMER: Tasks in this section could be charcheable. Don't keep working resources alone - terminate it. 
Use free tier features and secure your account properly. Deactivate your AWS account if you aren't going 
to use it in the future 

https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all


## Tasks

* Create an AWS account and protect the root user with MFA https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa
Answer: *** As below picture shows the MFA is enabled for my free account***

![](https://i.imgur.com/8PhBoNJ.png)


* Create an EC2 instance, connect to it through SSH and install apache or nginx manually, terminate it then.

Answer: ***I had already AWS account and added a new EC2 instance. I also generated the key pair of SSH type ed25519 in AWS and download the key. I used Putty-keygen tool to convert the key into putty key (.ppk). I added the username and SSH key into putty and below shows that I am connected to Putty***

![](https://i.imgur.com/3dcepNW.png)

***Below I am installing nginx***

```
sudo yum update
sudo yum install nginx
```



* Create an EC2 instance, provision software (apache/nginx) using Cloudformation, validate the installation, finally delete the stack. 
  Provide the resulting template as outcome of this task.

* (*) Given that we have a properly written Cloudformation template come up with an idea how we 
  can create and update a cloudformation stack based on this template automatically. Try to implement it.

## Questions

1. What the benefits of the cloud computing?

2. What is the Infrastructure As Code? Pros/cons of it?


