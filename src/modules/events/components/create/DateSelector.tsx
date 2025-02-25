import { FormControl } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  label: string;
}

export const DateSelector = ({ selectedDate, onDateChange, label }: DateSelectorProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth>
        <DesktopDatePicker
          label={label}
          value={selectedDate}
          onChange={onDateChange}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '16px',
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '1px',
                },
              },
            },
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
};
