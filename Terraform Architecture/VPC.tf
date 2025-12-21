resource "aws_vpc" "notes-vpc" {

  cidr_block =  "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "notes-vpc"
  }
  
}

resource "aws_internet_gateway" "notes-igw" {

  vpc_id =   aws_vpc.notes-vpc.id

}

resource "aws_subnet" "notes-app" {

  vpc_id = aws_vpc.notes-vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"

  tags = {
    Name = "notes-app-subnet"
  }
  
}

resource "aws_subnet" "notes-db" {
  
  vpc_id = aws_vpc.notes-vpc.id
  cidr_block = "10.0.2.0/24"
  map_public_ip_on_launch = true
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "notes-db-subnet"
  }

}

resource "aws_route_table" "notes-route-table" {

  vpc_id = aws_vpc.notes-vpc.id

  route  {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.notes-igw.id
  }
  
}

resource "aws_route_table_association" "app" {

  subnet_id = aws_subnet.notes-app.id
  route_table_id = aws_route_table.notes-route-table.id
  
}

resource "aws_route_table_association" "db" {

  subnet_id = aws_subnet.notes-db.id
  route_table_id = aws_route_table.notes-route-table.id
  
}



