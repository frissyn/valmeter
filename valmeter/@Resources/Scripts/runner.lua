discordRPC = require("discordRPC")


function discordRPC.ready(userId, username, discriminator, avatar)
    print(string.format("RPC Ready: [%s](%s,#%s)", userId, username, discriminator))
end


function discordRPC.disconnected(errorCode, message)
    print(string.format("RPC Disconnect: [%d: %s]", errorCode, message))
end


function discordRPC.errored(errorCode, message)
    print(string.format("RPC Error: (%d: %s)", errorCode, message))
end


function Update()
    local gameProc = SKIN:GetMeasure('GameProcess'):GetValue()
    local clientProc = SKIN:GetMeasure('ClientProcess'):GetValue()

    if gameProc == 0 and clientProc == 1 then
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Loading...')
    elseif gameProc = 1 and clientProc == 1 then
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Active!')
    else
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Inactive!')
    end
end
