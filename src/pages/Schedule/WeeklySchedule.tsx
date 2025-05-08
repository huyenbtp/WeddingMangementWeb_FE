import { Box, Typography, } from "@mui/material";
import { IParty } from "../../interfaces/party.interface";
import { defaultBgColorMap, } from "../Party/PartyTable";
import dayjs from "dayjs";

export default function WeeklySchedule({
    weekDates,
    partyData,
    onViewPartyDetail
}: {
    weekDates: dayjs.Dayjs[],
    partyData: IParty[],
    onViewPartyDetail: (party: any) => void,
}) {
    return (
        <Box sx={{
            height: "100%",
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
        }}>
            {weekDates.map((date, index) => (
                <Box
                    key={date.toString()}
                    sx={{
                        overflow: 'hidden',
                        borderRight: index < 6 ? '1px solid black' : 'none',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        paddingBottom: '10px',
                        borderBottom: '1px black solid',
                    }}>
                        <Typography sx={{
                            fontSize: '10px',
                            color: '#444746',
                            fontWeight: 'bold',
                        }}>
                            {date.format("ddd").toUpperCase()}
                        </Typography>
                        <Typography sx={{
                            fontSize: '24px',
                            color: '#444746',
                        }}>
                            {date.format("D")}
                        </Typography>
                    </Box>

                    <Box sx={{
                        height: 'calc(100% - 67px)',
                        overflowY: 'auto',
                        scrollbarGutter: 'stable both-edges',
                        display: 'flex',
                        flexDirection: 'column', 
                        padding: '10px',
                        gap: '10px',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '10px',
                            backgroundColor: '#e3e3e1'
                        },
                    }}>
                        {partyData
                            .filter((p) => dayjs(p.date).isSame(date, "day"))
                            .map((party) => (
                                <Box
                                    key={party.id}
                                    sx={{
                                        borderRadius: '10px',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: defaultBgColorMap[party.hall],
                                    }}
                                    onClick={() => onViewPartyDetail(party)}
                                >
                                    <Typography variant="body2">
                                        {`${party.groom} & ${party.bride}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`${party.shift} - Sảnh ${party.hall}`}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}