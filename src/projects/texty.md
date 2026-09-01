---
title: Make your own system monitors and text animations on your desktop
name: texty
date: "2025"
url: https://github.com/calico32/texty
icons: [simple-icons:go, simple-icons:gtk]
class: hover:bg-pink-700 [.active]:bg-pink-700
accent: border-pink-500
---

# texty

After moving to Wayland, I found myself missing
[conky](https://github.com/brndnmtthws/conky), a program that displays system
information in the background on the desktop. I wanted to make a similar program
for Wayland, but allow for more customization and flexibility in what is
displayed.

texty leverages Wayland's [layer shell
protocol](https://wayland.app/protocols/wlr-layer-shell-unstable-v1), GTK for
rendering, and [KDL](https://kdl.dev) for configuration to allow users to create
their own system monitors and animations on their desktop. Because it can
display the output of any script, you can display pretty much anything you want,
be it system info, a clock, the weather, or ASCII art.
