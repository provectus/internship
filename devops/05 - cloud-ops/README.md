## Prerequsite

* AWS free tier account https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

DISCLAIMER: Tasks in this section could be charcheable. Don't keep working resources alone - terminate it. 
Use free tier features and secure your account properly. Deactivate your AWS account if you aren't going 
to use it in the future 

https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all


## Tasks

* Create an AWS account and protect the root user with MFA https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa

Already done (in May 2021).

* Create an EC2 instance, connect to it through SSH and install apache or nginx manually, terminate it then. 

Done.

* Create an EC2 instance, provision software (apache/nginx) using Cloudformation, validate the installation, finally delete the stack. 
  Provide the resulting template as outcome of this task.

My configuration is in `aws_cf_nginx_template.json`.

* (*) Given that we have a properly written Cloudformation template come up with an idea how we 
  can create and update a cloudformation stack based on this template automatically. Try to implement it.

## Questions

1. What the benefits of the cloud computing?

With the cloud we don't need to buy expensive infrastructure.
It won't be useless while we aren't using them.
It will not get loss in cost for us cause we don't own this.
When we need to do some computing, just take access to camputing power in some cloud service, 
and other cloud service users can use it the rest of the time. 
We don't have to maintain hardware infrastructure.
Finally, the cloud system can be distributed so we can get
access to our services or infrastructure wherever we are.
And this one can be high perfomance, scaleable and fault resistant.

2. What is the Infrastructure As Code? Pros/cons of it?

We can have hardware infrastructure in our own. We will support this with all the consequences.
Or we can have configuration file which describes components of hardware infrastructure and their interaction.
When we have to do something with our "hardware" we just edit this config file or operate with some interface.
It will save our funds, time and many other resources.

But it can be difficult to work for some users. We can't implement some new features until it will be accessable on
your cloud service. Also there are some troubles to diagnostic, and troubleshoot this.
IaC can be really complex, difficult to understand and maintain this one.
