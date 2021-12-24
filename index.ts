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

const _subnetGroup = new aws.rds.SubnetGroup("subnet_group", {
  subnetIds: [subnet1.id, subnet2.id],
  tags: {
    Name: "bravo-subnet-group",
  },
});

const bravo_rds = new aws.rds.Instance("bravo-rds", {
  allocatedStorage: 100,
  engine: "postgres",
  engineVersion: "13.3",
  instanceClass: "db.t3.medium",
  dbSubnetGroupName: _subnetGroup.id,
  skipFinalSnapshot: true,
  name: "bravodb",
  password: "bravoadmin",
  username: "bravoadmin",
},
  {
    dependsOn: _subnetGroup
  }
);

const assume_role = new aws.iam.Role("bravo-assume-role", {
  assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`,
});

const bravo_AmazonEKSClusterPolicy = new aws.iam.RolePolicyAttachment(
  "example-AmazonEKSClusterPolicy",
  {
    policyArn: "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy",
    role: assume_role.name,
  }
);

const bravo_AmazonEKSVPCResourceController = new aws.iam.RolePolicyAttachment(
  "example-AmazonEKSVPCResourceController",
  {
    policyArn: "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController",
    role: assume_role.name,
  }
);

const bravo_cluster1 = new aws.eks.Cluster(
  "bravo1",
  {
    roleArn:
      "arn:aws:iam::417732881703:role/EKSROLETEAMBRAVO",
    vpcConfig: {
      subnetIds: [subnet1.id, subnet2.id],
    },
  },
  {
    dependsOn: [
      bravo_AmazonEKSClusterPolicy,
      bravo_AmazonEKSVPCResourceController,
    ],
  }
);

const bravo_cluster2 = new aws.eks.Cluster(
  "bravo2",
  {
    roleArn:
      "arn:aws:iam::417732881703:role/EKSROLETEAMBRAVO",
    vpcConfig: {
      subnetIds: [subnet1.id, subnet2.id],
    },
  },
  {
    dependsOn: [
      bravo_AmazonEKSClusterPolicy,
      bravo_AmazonEKSVPCResourceController,
    ],
  }
);

// Export the name of the bucket
export const endpoints = [bravo_cluster1, bravo_cluster2];
