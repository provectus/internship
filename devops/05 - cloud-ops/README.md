## Prerequsite

* AWS free tier account https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

DISCLAIMER: Tasks in this section could be charcheable. Don't keep working resources alone - terminate it. 
Use free tier features and secure your account properly. Deactivate your AWS account if you aren't going 
to use it in the future 

https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all


## Tasks

* Create an AWS account and protect the root user with MFA https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa
Done
* Create an EC2 instance, connect to it through SSH and install apache or nginx manually, terminate it then. 
Done
* Create an EC2 instance, provision software (apache/nginx) using Cloudformation, validate the installation, finally delete the stack. 
  Provide the resulting template as outcome of this task.
In the file above `configuration.yaml`
* (*) Given that we have a properly written Cloudformation template come up with an idea how we 
  can create and update a cloudformation stack based on this template automatically. Try to implement it.

## Questions

1. What the benefits of the cloud computing?

- Cost: computing eliminates the capital expense of buying hardware and software and setting up and running on-site data centers.. It all adds up very fast
- Speed: typically with just a few mouse clicks, giving businesses a lot of flexibility and taking the pressure off capacity planning
- Performance: The biggest cloud computing services run on a worldwide network of secure data centers, which are regularly upgraded to the latest generation of fast and efficient computing hardware.
- Security: Many cloud providers offer a broad set of policies, technologies and controls that strengthen your security posture overall

2. What is the Infrastructure As Code? Pros/cons of it?

Infrastructure as Code is a way to automate the DevOps tasks (managing and provisioning infrastructure using configuration files) end to end instead of doing it manually.

Advantages:
- It’s faster than manual processes for provisioned resources, databases, networking…
- Developer can deploy servers and applications according to business practicing and policies
- Alignment with DevOps

Disadvantages:
- Require additional tools (which could cause additional errors)
- Places more responsibility to developers to write efficient code



