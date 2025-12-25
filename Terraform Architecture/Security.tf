resource "aws_security_group" "main-sg" {
  
    name = "notes-sg"
    vpc_id = aws_vpc.notes-vpc.id

    # allowed ip
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp" 
        cidr_blocks = [var.allowed_IPs]
    }

    # application/nginx
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = [var.allowed_IPs]
    }

    # sql 
    ingress {
        from_port = 3306
        to_port = 3306
        protocol = "tcp"
        cidr_blocks = [var.allowed_IPs]
    }

    # nodeport
    ingress {
        from_port = 30000
        to_port = 32767
        protocol = "tcp"
        cidr_blocks = [var.allowed_IPs]
    }


    ingress {
        from_port = 9100
        to_port = 9100
        protocol = "tcp"
        cidr_blocks = [var.allowed_IPs]
    }

    ingress {
        from_port   = 30080
        to_port     = 30080
        protocol    = "tcp"
        cidr_blocks = [var.allowed_IPs]
    }


    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}