import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const vpc = new aws.ec2.Vpc("bravo-vpc", {
  cidrBlock: "22.0.0.0/16",
  enableDnsHostnames: true,
  tags: {
    Name: "bravo-vpc",
  },
});

const bravo_sg = new aws.ec2.SecurityGroup("bravo-sg", {
    description: "Allow TLS inbound traffic",
    vpcId: vpc.id,
    ingress: [{
        description: "TLS from VPC",
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: [vpc.cidrBlock],
    }],
    egress: [{
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: ["0.0.0.0/0"],
        ipv6CidrBlocks: ["::/0"],
    }],
    tags: {
        Name: "bravo-sg",
    },
});

const gw = new aws.ec2.InternetGateway("gw", {
  vpcId: vpc.id,
  tags: {
    Name: "bravo-gw",
  },
});

const subnet1 = new aws.ec2.Subnet("bravo-subnet1", {
  vpcId: vpc.id,
  cidrBlock: "22.0.1.0/24",
  availabilityZone: "us-east-1a",
  tags: {
    Name: "bravo-subnet1",
  },
});

const subnet2 = new aws.ec2.Subnet("bravo-subnet2", {
  vpcId: vpc.id,
  cidrBlock: "22.0.2.0/24",
  availabilityZone: "us-east-1b",
  tags: {
    Name: "bravo-subnet2",
  },
});

const publicRouteTable = new aws.ec2.RouteTable("bravo-rt", {
    routes: [
        {
            cidrBlock: "0.0.0.0/0",
            gatewayId: gw.id,
        },
    ],
    vpcId: vpc.id,
});

const _subnetGroup = new aws.rds.SubnetGroup("subnet_group", {
  subnetIds: [subnet1.id, subnet2.id],
  tags: {
    Name: "bravo-subnet-group",
  },
});

// const bravo_rds = new aws.rds.Instance("bravo-rds", {
//   allocatedStorage: 100,
//   engine: "postgres",
//   engineVersion: "13.3",
//   instanceClass: "db.t3.medium",
//   dbSubnetGroupName: _subnetGroup.id,
//   skipFinalSnapshot: true,
//   name: "bravodb",
//   password: "bravoadmin",
//   username: "bravoadmin",
// },
//   {
//     dependsOn: _subnetGroup
//   }
// );

const bravo_cluster1 = new eks.Cluster(
  "bravo1",
  {
    vpcId: vpc.id,
    publicSubnetIds: [subnet1.id, subnet2.id],
    nodeAssociatePublicIpAddress: true,
    clusterSecurityGroup: bravo_sg
  }
);

const bravo_cluster2 = new eks.Cluster(
  "bravo2",
  {
    vpcId: vpc.id,
    publicSubnetIds: [subnet1.id, subnet2.id],
    clusterSecurityGroup: bravo_sg,
    nodeAssociatePublicIpAddress: true,
    kubernetesServiceIpAddressRange: "172.16.0.0/12"
  }
);

const postgresql = new aws.rds.Cluster("postgresql", {
    availabilityZones: [
        "us-east-1a",
        "us-east-1b",
        "us-east-1c",
    ],
    clusterIdentifier: "aurora-cluster-demo",
    vpcSecurityGroupIds: bravo_sg,
    databaseName: "bravodb",
    engine: "aurora-postgresql",
    masterPassword: "bravoadmin",
    masterUsername: "bravoadmin",
    skipFinalSnapshot: true
});

// Export the name of the bucket
export const endpoints = [bravo_cluster1, bravo_cluster2];
export const kubeconfig1 = bravo_cluster1.kubeconfig;
export const kubeconfig2 = bravo_cluster2.kubeconfig;
export const rds = postgresql
