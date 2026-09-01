---
title: A from-scratch Linux EFI bootloader
name: wboot
date: "2026"
url: https://github.com/calico32/wboot
icons: [simple-icons:linux, simple-icons:c, simple-icons:qemu]
class: hover:bg-blue-700 [.active]:bg-blue-700
accent: border-blue-500
---

# wboot

wboot is a from-scratch Linux EFI bootloader written in C. It has a single
dependency (Zstandard for decompression), but is otherwise is only dependent on
the UEFI specification. It is capable of booting a modern Linux kernel with
initramfs, and has been tested on QEMU and real hardware.

It begins with a config file that specifies the kernel and initramfs to boot, as
well as any kernel command line arguments. Using UEFI boot services, the
bootloader reads the kernel and initramfs into memory, decompresses them, sets
up the CPU and memory for the kernel, and finally jumps to the kernel entry
point.

wboot was written for CS 502: Operating Systems at WPI to demonstrate operating
system concepts, and thus is not intended for production use. Still, it was a
lot of fun to work in such a different environment than I'm used to. Check out
the corresponding
[presentation](https://github.com/calico32/wboot/blob/main/presentation/presentation.pdf)
for more details on the project.
