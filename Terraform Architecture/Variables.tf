variable "aws_region" {
  
  description = "Infrastructure Region"
  type =  string
  default = "us-east-1"

}

variable "server_instance_type" {

  description = "Type of Instance"
  type = string
  
}

variable "db_instance_type" {

  description = "Type of DB Instance"
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


variable "db_name" {
  
  description = "Database name"
  type = string

}

variable "db_username" {
  
  description = "Database username"
  type = string
  sensitive = true
  
}

variable "db_password" {
  
  description = "Database password"
  type = string
  sensitive = true
  
}
