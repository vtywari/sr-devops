[kubernetes_master]
master-node-1

[kubernetes_workers]
worker-node-1
worker-node-2

[kubernetes_nodes:children]
kubernetes_master
kubernetes_workers
