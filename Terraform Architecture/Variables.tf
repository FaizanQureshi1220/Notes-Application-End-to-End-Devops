variable "aws_region" {
  
  description = "Infrastructure Region"
  type =  string
  default = "us-east-1"

}

variable "instance_type" {

  description = "Type of Instance"
  type = string
  
}

variable "key_name" {

  description = "SSH key-pair name"
  type = string
  
}

variable "allowed_IPs" {

  description = "Allowed IPs to SSH into server"
  type = string
  
}

variable "ami" {
  
  description = "amazon machine image"
  type = string

}