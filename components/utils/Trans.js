import React from 'react'
import { Trans as TransComponent, useTranslation } from 'react-i18next';
import Typography from "@mui/material/Typography";
// combine mui typography and i18next trans component


export default function Trans({TypographyProps, TransProps}) {
    const { t } = useTranslation(TransProps.namespace);
  return (
    <Typography {...TypographyProps}>
        <TransComponent {...TransProps} t={t} />
    </Typography>
  )
}
