module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  default_security_group_egress = [{
    type        = "egress"
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = "0.0.0.0/0"
  }]

  default_security_group_ingress = [{
    type        = "ingress"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = "0.0.0.0/0"
  }]

  manage_default_security_group = true

  enable_nat_gateway = false
  enable_vpn_gateway = false
}
