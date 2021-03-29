function Initialize()
    Running = false
    Script = SKIN:GetVariable('@')..'Scripts\\presence.js'

    print('Found Script: ' .. Script)
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
            os.execute(table.concat({'node', Script}, " "))
        end
    else
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Inactive!')
    end
end
