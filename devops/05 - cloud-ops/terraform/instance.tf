data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  user_data_base64 = filebase64("./nginx_install.sh")
  tags = {
    ManagedBy = "Terraform"
  }
  subnet_id = module.vpc.public_subnets[0]
}

resource "aws_eip" "web" {
  instance = aws_instance.web.id
  vpc      = true
}

output "public_ip" {
  value = aws_eip.web.public_ip
}