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
