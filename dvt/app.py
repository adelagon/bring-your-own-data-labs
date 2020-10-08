#!/usr/bin/env python3

from aws_cdk import core

from byod_dvt.byod_dvt_stack import ByodDvtStack


app = core.App()
w = ByodDvtStack(app, "byod-dvt")

app.synth()