resource "aws_instance" "app_node" {
  
    ami = var.ami
    instance_type = var.server_instance_type
    subnet_id = aws_subnet.notes-app.id
    key_name = var.key_name
    vpc_security_group_ids = [aws_security_group.main-sg.id]

    tags = {
      Name = "notes-app-node"
    }

}

resource "aws_instance" "db_monitoring" {

    ami = var.ami
    instance_type = var.db_instance_type
    subnet_id = aws_subnet.notes-db.id
    key_name = var.key_name
    vpc_security_group_ids = [aws_security_group.main-sg.id]

    tags = {
      Name = "notes-db-monitoring-node"
    }
  
}