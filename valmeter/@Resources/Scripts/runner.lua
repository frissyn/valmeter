function Update()
    local gameProc = SKIN:GetMeasure('GameProcess')
    local clientProc = SKIN:GetMeasure('ClientProcess')

    if gameProc:GetValue() == 1 and clientProc:GetValue() == 1 then
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Active!')
    else
        SKIN:Bang('!SetOption', 'RPCMeter', 'Text', 'RPC: Inactive!')
    end
end
