output "app_public_ip" {
  value = aws_instance.app_node.public_ip
}

output "db_public_ip" {
  value = aws_instance.db_monitoring.public_ip
}

output "db_private_ip" {
  value = aws_instance.db_monitoring.private_ip
}