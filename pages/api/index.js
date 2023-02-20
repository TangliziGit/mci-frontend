export const jobSource = [
    {
        "os": "centos",
        "os_version": "7",
        "os_mount": "nfs",
        "os_arch": "x86_64",
        "suite": "hello-world",
        "category": "functional",
        "hello-world": null,
        "id": "4acc805e-9644-4067-a470-a53895083487",
        "plan": "6c5a4df3-3bf3-46c5-b75c-ecf013a79116",
        "stage": "boot",
        "state": "done",
        "priority": 0,
        "repository": "https://github.com/leachim6/hello-world",
        "PKGBUILD": "https://raw.githubusercontent.com/TangliziGit/multiple-ci-repos/main/h/hello-world/PKGBUILD",
        "result_service": "raw_upload",
        "RESULT_ROOT": "/result",
        "LKP_SERVER": "172.20.0.1",
        "status": "finished",
        "loadavg": "0.37 0.08 0.03 1/163 1699",
        "start_time": "1673968818",
        "end_time": "1673968818",
    },
    {
        "os": "centos",
        "os_version": "7",
        "os_mount": "nfs",
        "os_arch": "aarch64",
        "suite": "hello-world",
        "category": "functional",
        "hello-world": null,
        "id": "4bcc805e-9644-4067-a470-a53895083487",
        "plan": "6c5a4df3-3bf3-46c5-b75c-ecf013a79116",
        "stage": "boot",
        "state": "done",
        "priority": 0,
        "repository": "https://github.com/leachim6/hello-world",
        "PKGBUILD": "https://raw.githubusercontent.com/TangliziGit/multiple-ci-repos/main/h/hello-world/PKGBUILD",
        "result_service": "raw_upload",
        "RESULT_ROOT": "/result",
        "LKP_SERVER": "172.20.0.1",
        "status": "finished",
        "loadavg": "0.37 0.08 0.03 1/163 1699",
        "start_time": "1673968818",
        "end_time": "1673968818",
    },
    {
        "os": "centos",
        "os_version": "7",
        "os_mount": "nfs",
        "os_arch": "x86_64",
        "suite": "pkgbuild",
        "category": "functional",
        "pkgbuild": null,
        "id": "5b8787a3-0aaa-43c3-be58-344ca2e522da",
        "plan": "6c5a4df3-3bf3-46c5-b75c-ecf013a79116",
        "stage": "build",
        "state": "done",
        "priority": 0,
        "repository": "https://github.com/leachim6/hello-world",
        "PKGBUILD": "https://raw.githubusercontent.com/TangliziGit/multiple-ci-repos/main/h/hello-world/PKGBUILD",
        "result_service": "raw_upload",
        "RESULT_ROOT": "/result",
        "LKP_SERVER": "172.20.0.1",
        "status": "finished",
        "loadavg": "0.06 0.02 0.01 1/159 1940",
        "start_time": "1673958779",
        "end_time": "1673958791",
        "success": true
    }
]

export const planSource = [
    {
        "id": "9845fa3d-ad3e-429a-890f-ba242a9aacfb",
        "name": "linux",
        "commit": {
            "meta": "b7304b0162dfdc75b1c829eb1f818a83c066fda0",
            "repo": "97ec4d559d939743e8af83628be5af8da610d9dc"
        },
        "repository": "https://github.com/archlinux/linux",
        "PKGBUILD": "https://raw.githubusercontent.com/TangliziGit/multiple-ci-repos/main/l/linux/PKGBUILD",
        "stages": [
            {
                "name": "build",
                "jobs": [
                    "523ef19e-e51d-4070-9cf4-96ad61f5d9d9"
                ],
                "commands": [
                    "os=centos os_version=7 os_mount=nfs os_arch=x86_64 pkgbuild.yaml"
                ],
                "residual": 0,
                "state": "success"
            },
            {
                "name": "boot",
                "jobs": [
                    "5240d482-383d-409c-9ae1-2664a33f35c2"
                ],
                "commands": [
                    "os=centos os_version=7 os_mount=nfs os_arch=x86_64 runtime=10 idle.yaml"
                ],
                "residual": 0,
                "state": "success"
            }
        ],
        "config": {
            "kernel": "523ef19e-e51d-4070-9cf4-96ad61f5d9d9/initrd/pkg/nfs/centos/x86_64/7/linux/boot/vmlinuz-6.2.0-rc4-gc1649ec55708",
            "initramfs": "523ef19e-e51d-4070-9cf4-96ad61f5d9d9/initrd/pkg/nfs/centos/x86_64/7/linux/boot/initramfs.lkp-6.2.0-rc4-gc1649ec55708.img",
            "packages": []
        }
    },
    {
        "id": "6c5a4df3-3bf3-46c5-b75c-ecf013a79116",
        "name": "hello-world",
        "commit": {
            "meta": "7ca1bdb36aa9a3258a6e4ebd734ddbc85387fd31",
            "repo": "aeb09c6ced9e2bebb28efa95c1fa51a0359d5aa8"
        },
        "repository": "https://github.com/leachim6/hello-world",
        "PKGBUILD": "https://raw.githubusercontent.com/TangliziGit/multiple-ci-repos/main/h/hello-world/PKGBUILD",
        "stages": [
            {
                "name": "build",
                "jobs": [
                    "5b8787a3-0aaa-43c3-be58-344ca2e522da"
                ],
                "commands": [
                    "os=centos os_version=7 os_mount=nfs os_arch=x86_64 pkgbuild.yaml"
                ],
                "residual": 0,
                "state": "success"
            },
            {
                "name": "boot",
                "jobs": [
                    "e720b215-4b9b-4ed8-b3ca-026fb0a575a0"
                ],
                "commands": [
                    "os=centos os_version=7 os_mount=nfs os_arch=x86_64 hello-world.yaml"
                ],
                "residual": 0,
                "state": "success"
            }
        ],
        "config": {
            "vmlinuz": "",
            "packages": [
                "5b8787a3-0aaa-43c3-be58-344ca2e522da/initrd/pkg/nfs/centos/x86_64/7/hello-world/hello-world-r1938.aeb09c6-1.cgz"
            ]
        }
    }
];

export const machineSource = [
    {
        "mac": "52:54:00:00:00:01",
        "arch": "x86_64",
        "state": "idle",
        "name": "localhost",
        "status": "rebooting",
        "ip": "172.20.125.218",
        "job_id": "14fb2952-127a-4df8-b36a-be05efd693fe"
    },
    {
        "mac": "52:54:00:00:00:02",
        "arch": "x86_64",
        "state": "busy",
        "name": "localhost",
        "status": "rebooting",
        "ip": "172.20.125.218",
        "job_id": "14fb2952-127a-4df8-b36a-be05efd693fe"
    },
    {
        "mac": "52:54:00:00:00:03",
        "arch": "x86_64",
        "state": "down",
        "name": "localhost",
        "status": "rebooting",
        "ip": "172.20.125.218",
        "job_id": "14fb2952-127a-4df8-b36a-be05efd693fe"
    }
];

export const repoSource = [
    {
        "name": 'hello-world',
        "job_count": 20,
        "plan_count": 8,
        "success_rate": 0.89,
        "avg_duration": 25.3,
    }
]
