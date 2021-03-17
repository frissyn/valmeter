[ClientProcess]
Measure=Plugin
Plugin=Process
ProcessName=RiotClientServices.exe
Substitute="-1":"Not Running","1":"Running"

[GameProcess]
Measure=Plugin
Plugin=Process
ProcessName=VALORANT.exe
Substitute="-1":"Not running","1":"Running"
