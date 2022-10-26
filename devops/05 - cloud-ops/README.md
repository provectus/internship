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

***Below I installed nginx and curl the webserver***

```
sudo yum update
sudo amazon-linux-extras install nginx1
```

![](https://i.imgur.com/GEtr4oh.png)

* Create an EC2 instance, provision software (apache/nginx) using Cloudformation, validate the installation, finally delete the stack. 
  Provide the resulting template as outcome of this task.

Answer: ***This task was very informative for me as I experience new thing. Below I created new stack which will run the Apache web, since I did not have experiance on creating the templete of cloudformation. I found a template and loaded into couldfare. See below the stack***

![](https://i.imgur.com/jKC1F1h.png)


* (*) Given that we have a properly written Cloudformation template come up with an idea how we 
  can create and update a cloudformation stack based on this template automatically. Try to implement it.

## Questions

1. What the benefits of the cloud computing?

Answer 1: ***Cloud computing is an approach that provides any kind of service on-demand over the internet. The most important is easy to manage, performance and we can cancel the subsription anytime we can.***

***This saves time and money, suppose we want to create a bussiness where we need to run our web app. It not very logical to create our own server room or data center, what if the buseniss fails and all the CAPex money will be gone. What we can do it to subscribe to some Cload provider and get the service.***

***The negatice point of cloud computing is the security of the data. Even the cloud provider says that the data is secure and the privacy is kept but still the data is accessable to cloud provider.***



2. What is the Infrastructure As Code? Pros/cons of it?

Answer 2: ***nfrastructure as code is the an approach of managing and provisioning computer data centers through simple configuration codes, rather than physical hardware configuration or interactive configuration tools.***

***Pros are: Speed and efficiency automation, one can manage infrastructure through source control team collaboration, and it is repeatable and reduces technical debt.***

***Cons: Lack of example code, Structuring of the IaC state, Integrating it with the CI/CD pipeline, and Working collaboratively (for remote state file)***

