// components/CurrencySelector.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Form } from 'react-bootstrap';

const CurrencySelector = () => {
    const { dispatch, currency } = useContext(AppContext);

    const currencies = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        AUD: 'A$',
        CAD: 'C$',
        CHF: 'Fr',
        CNY: '¥',
        SEK: 'kr',
        NZD: 'NZ$',
        INR: '₹',
        BRL: 'R$',
        RUB: '₽',
        ZAR: 'R',
        SGD: 'S$',
        HKD: 'HK$',
        NOK: 'kr',
        MXN: '$',
        TRY: '₺',
        KRW: '₩',
        PLN: 'zł',
        THB: '฿',
        MYR: 'RM',
        DKK: 'kr',
        HUF: 'Ft',
        CZK: 'Kč',
        ILS: '₪',
        PHP: '₱',
        IDR: 'Rp',
        SAR: '﷼',
        AED: 'د.إ',
        CLP: '$',
        COP: '$',
        PEN: 'S/',
        VND: '₫',
        UAH: '₴',
        RON: 'lei',
        BGN: 'лв',
        HRK: 'kn',
        ISK: 'kr',
        ARS: '$',
        CRC: '₡',
        DOP: 'RD$',
        GTQ: 'Q',
        HNL: 'L',
        JMD: '$',
        KES: 'KSh',
        KWD: 'د.ك',
        MAD: 'د.م.',
        NGN: '₦',
        OMR: 'ر.ع.',
        PAB: 'B/.',
        PKR: '₨',
        PYG: '₲',
        QAR: 'ر.ق',
        RSD: 'дин.',
        SVC: '$',
        TND: 'د.ت',
        TWD: 'NT$',
        UYU: '$',
        VEF: 'Bs.',
        BHD: '.د.ب',
        BOB: 'Bs.',
        EGP: '£',
        GHS: '₵',
        JOD: 'د.ا',
        LBP: 'ل.ل',
        LKR: 'Rs',
        MMK: 'K',
        NAD: '$',
        NPR: 'Rs',
        SZL: 'E',
        TZS: 'TSh',
        XAF: 'FCFA',
        XCD: '$',
        XOF: 'CFA',
        ZMW: 'ZK',
        BBD: '$',
        BMD: '$',
        BSD: '$',
        FJD: '$',
        GYD: '$',
        KYD: '$',
        MUR: '₨',
        SCR: '₨',
        SBD: '$',
        TTD: '$',
        BWP: 'P',
        ETB: 'Br',
        GMD: 'D',
        MGA: 'Ar',
        MWK: 'MK',
        SOS: 'Sh',
        UGX: 'USh',
        XPF: '₣',
        ZWD: '$'
    };

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value
        });
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Control
                as="select"
                value={currency}
                onChange={handleCurrencyChange}
            >
                {Object.entries(currencies).map(([code, symbol]) => (
                    <option key={code} value={symbol}>{code} ({symbol})</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default CurrencySelector;