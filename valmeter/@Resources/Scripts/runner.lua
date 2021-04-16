function Initialize()
    Running = false
    Location = SKIN:GetVariable("@").."Scripts"
    Script = SKIN:GetVariable("@").."Scripts\\presence.js"
end

function Update()
    local gameProc = SKIN:GetMeasure('GameProcess'):GetValue()
    local clientProc = SKIN:GetMeasure('ClientProcess'):GetValue()

    if gameProc == 0 and clientProc == 1 then
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Loading...')
    elseif gameProc == 1 and clientProc == 1 then
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Active!')

        if not Running then
            Running = true
            os.execute(
                table.concat({
                    [[start "NPM" %ComSpec% /D /E:ON /K]],
                    string.format([["call cd %s &]], Location),
                    [[call npm.cmd i &]],
                    [[call npm.cmd start"]]
                })
            )
        end
    else
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Inactive!')
    end
end
