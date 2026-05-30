// import { config } from "../config";
const formatHelper = {};

formatHelper.currency = (
    value = 0,
    options = { config: {} },
    countryCode = "IN"
) => {
    // NOTE:
    //      refer config document from below link
    //      link: https://www.techonthenet.com/js/number_tolocalestring.php

    const countryConfigs = {
        "IN": { currency: "INR", style: "currency", useGrouping: true },
        "US": { currency: "USD", style: "currency", useGrouping: true },
        "AU": { currency: "AUD", style: "currency", useGrouping: true },
        "SAR": { currency: "SAR", style: "currency", useGrouping: true },
    }

    const countryLocale = {
        "US": "en-US",
        "IN": "en-IN",
        "AU": "en-AU",
        "SA": "en-SA",
    }

    const locale = countryLocale[countryCode];
    const countryCurrency = countryConfigs[countryCode];

    const config = {
        currency: "INR",             // default value to prevent code break
        style: "currency",           // default value to prevent code break
        useGrouping: true,          // default value to prevent code break
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...countryCurrency,
        ...options.config,
    };

    if (value === 0) {
        config.maximumFractionDigits = 0;
    }

    let fixedValue = Number(
        Number(value).toFixed(config.maximumFractionDigits)
    );

    const formattedNumber = fixedValue.toLocaleString(locale, {
        ...config,
        style: "decimal",
    });

    return `${formattedNumber} ${config.currency}`;
};

formatHelper.getImageURI = (slug = null) => {
    if (!slug) {
        return;
    }
    let slash = "";
    if (slug.slice(0, 1) !== "/") {
        slash = "/";
    }
    return `${config.apiUrl}${slash}${slug}`;
};

formatHelper.getLegacyImageURI = (slug = null) => {
    if (!slug) {
        return;
    }
    let slash = "";
    if (slug.slice(0, 1) !== "/") {
        slash = "/";
    }
    return `${config.legacyApiUrl}${slash}${slug}`;
};

formatHelper.parseDecimal = (value = null) => {
    if (!value || isNaN(value)) {
        return;
    }
    return Number(value).toFixed(2);
};

formatHelper.roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}

formatHelper.addCommaInNumber = (n = null) => {
    if (!n) {
        return;
    }
    return Number(n)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

formatHelper.getTimeAMPM = (date) => {
    date = new Date(date);  // convert to current timeZone

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes; // two digit should be shown
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
};

formatHelper.getLogDateFormate = (dateTime) => {
    if (!dateTime) {
        return
    }
    let createdDate = new Date(dateTime).getDate();
    let todayDate = new Date().getDate();
    let isToday = (createdDate == todayDate);
    // let yesterday = createdDate +" " + new Date(dateTime).toLocaleString('default', { month: 'long' })+ ", ";

    // use  this for adding year and for short month name
    let yesterday = createdDate + " " + new Date(dateTime).toLocaleString('default', { month: 'short', year: "numeric" }) + ", ";


    return `${isToday ? "Today, " : yesterday} ${dateTime ? formatHelper.getTimeAMPM(dateTime) : ""}`
}

// formatHelper.sortObjectDateAsc = (a, b) => {
// 	// <= -1 then a will come before b.
// 	// 0 then keep a and b in the same positions
// 	// >= 1 then b will come before a
// 	if (a.date < b.date) {
// 		return -1;
// 	}
// 	if (a.date > b.date) {
// 		return 1;
// 	}
// 	return 0;
// }

formatHelper.sortObjectDateAsc = (data, keyName = "date", isAsc = true) => {
    data.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        let dateA = new Date(b[keyName]);
        let dateB = new Date(a[keyName]);
        if (isAsc) {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });
    return data;
}




formatHelper.getLongCurrency = (price, country) => {

    if (price == null) {
        return "N/A";
    }

    // Convert the price to a number
    let numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        return "0";
    }

    let labelValue = Math.abs(numericPrice);
    let result = 0;

    if (country === "IN") {
        let cror = " Cr";
        let lac = " Lac";
        let thousand = " K";

        if (labelValue >= 1.0e7) {
            result = (numericPrice / 1.0e7).toFixed(2);
            result = formatHelper.roundToTwo(result) + cror;
        } else if (labelValue >= 1.0e5 && labelValue < 1.0e7) {
            result = (numericPrice / 1.0e5).toFixed(2);
            result = formatHelper.roundToTwo(result) + lac;
        } else if (labelValue >= 1.0e3 && labelValue < 1.0e5) {
            result = (labelValue / 1.0e3).toFixed(2);
            result = "$" + formatHelper.roundToTwo(result) + thousand;
        } else {
            result = numericPrice.toFixed(2);
            result = formatHelper.roundToTwo(result);
        }
    } else {
        let trillion = " T";
        let billion = " B";
        let million = " M";
        let thousand = " K";

        if (labelValue >= 1.0e12) {
            result = (numericPrice / 1.0e12).toFixed(2);
            result = formatHelper.roundToTwo(result) + trillion;
        } else if (labelValue >= 1.0e9 && labelValue < 1.0e12) {
            result = (numericPrice / 1.0e9).toFixed(2);
            result = formatHelper.roundToTwo(result) + billion;
        } else if (labelValue >= 1.0e6 && labelValue < 1.0e9) {
            result = (numericPrice / 1.0e6).toFixed(2);
            result = formatHelper.roundToTwo(result) + million;
        } else if (labelValue >= 1.0e3 && labelValue < 1.0e6) {
            result = (numericPrice / 1.0e3).toFixed(2);
            result = formatHelper.roundToTwo(result) + thousand;
        } else {
            result = numericPrice.toFixed(2);
            result = formatHelper.roundToTwo(result);
        }
    }


    return result;
};

formatHelper.getMonthNumber = (value) => {
    if (value === "January") { return "01" }
    if (value === "February") { return "02" }
    if (value === "March") { return "03" }
    if (value === "April") { return "04" }
    if (value === "May") { return "05" }
    if (value === "June") { return "06" }
    if (value === "July") { return "07" }
    if (value === "August") { return "08" }
    if (value === "September") { return "09" }
    if (value === "October") { return "10" }
    if (value === "November") { return "11" }
    if (value === "December") { return "12" }
    if (!value) {
        return null
    }
}

formatHelper.getPreviouseDayWorkingDate = (backDays = 0) => {
    let backDate;
    let today = new Date();

    let prevDay = backDays;
    if (today.getDay() == 6) {
        prevDay += 1;
    }
    if (today.getDay() == 0) {
        prevDay += 2;
    }

    backDate = today.setDate(today.getDate() - prevDay);
    backDate = formatHelper.getYMD(backDate);
    return backDate;
}

formatHelper.getYMD = (date) => {
    let dObj = new Date(date);
    let y = dObj.getFullYear();
    let m = dObj.getMonth() + 1;
    let d = dObj.getDate();

    if (m <= 9) {
        m = `0${m}`;
    }

    if (d <= 9) {
        d = `0${d}`;
    }
    return `${y}-${m}-${d}`;
}

formatHelper.getYM = (date) => {
    let dObj = new Date(date);
    let y = dObj.getFullYear();
    let m = dObj.getMonth() + 1;
    let d = 1;

    if (m <= 9) {
        m = `0${m}`;
    }

    if (d <= 9) {
        d = `0${d}`;
    }
    return `${y}-${m}`;
}

formatHelper.isToday = (date) => {
    let dateA = new Date();
    dateA = formatHelper.getYMD(dateA);
    let dateB = formatHelper.getYMD(date);
    return (dateA == dateB);
}

formatHelper.getDisplyFormate = (date) => {
    if (!date) {
        return "";
    }
    let dObj = new Date(date);
    let y = dObj.getFullYear();
    let m = dObj.toLocaleString('default', { month: 'long' });
    let d = dObj.getDate();

    return `${d} ${m} ${y}`;
}

formatHelper.getDisplayDM = (date) => {
    if (!date) {
        return "";
    }
    let dObj = new Date(date);
    let m = dObj.toLocaleString('default', { month: 'short' });
    let d = dObj.getDate();

    if (d && d.toString().length < 2) {
        d = "0" + d
    }

    return `${d} ${m}`;
}

formatHelper.getDisplayDMY = (date) => {
    if (!date) {
        return "";
    }
    let dObj = new Date(date);
    let m = dObj.toLocaleString('default', { month: 'short' });
    let d = dObj.getDate();
    let y = dObj.getFullYear();

    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${d}${getDaySuffix(d)} ${m} ${y}`;
}

formatHelper.getDisplayMDY = (date) => {
    if (!date) {
        return "";
    }
    let dObj = new Date(date);
    let m = dObj.toLocaleString('default', { month: 'short' });
    let d = dObj.getDate();
    let y = dObj.getFullYear();

    if (d && d.toString().length < 2) {
        d = "0" + d
    }

    return `${m} ${d}, ${y}`;
}


formatHelper.addSymbolCurrency = (price) => {

    let symbol = "";

    if (price < 0) {
        symbol = "-"
    } else if (price > 0) {
        symbol = "+"
    } else if (price == 0) {
        symbol = ""
    }

    // Convert the price to a number if it comes in string
    let numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
        return "0";
    }

    let labelValue = Math.abs(numericPrice);
    let result = 0;


    let cror = " Cr";
    let lac = " Lac";
    let thousand = " K";

    if (labelValue >= 1.0e7) {
        result = (labelValue / 1.0e7).toFixed(2);
        result = symbol + "₹" + formatHelper.roundToTwo(result) + cror;
    } else if (labelValue >= 1.0e5 && labelValue < 1.0e7) {
        result = (labelValue / 1.0e5).toFixed(2);
        result = symbol + "₹" + formatHelper.roundToTwo(result) + lac;
    } else if (labelValue >= 1.0e3 && labelValue < 1.0e5) {
        result = (labelValue / 1.0e3).toFixed(2);
        result = symbol + "₹" + formatHelper.roundToTwo(result) + thousand;
    } else {
        result = labelValue.toFixed(2);
        result = symbol + "₹" + formatHelper.roundToTwo(result);
    }

    return result
}


formatHelper.addSymbol = (price) => {

    let numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
        return "-";
    }

    let result;
    let symbol;

    if (price < 0) {
        symbol = ""
    } else if (price > 0) {
        symbol = "+"

    } else if (price == 0) {
        symbol = ""
    }
    return result = symbol + price

}

formatHelper.convertCamelCase = (value) => {
    return value
        ?.split("_")
        ?.map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return (
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            );
        })
        .join("");
};

formatHelper.getSign = ({ value }) => {
    if (value !== 0) {
        return value > 0 ? "+" : "";
    }
    return "";
};

formatHelper.convertToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = "01";

    return `${year}-${month}-${day}`;
};

formatHelper.convertDateToDMYString = (inputDate) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-GB",
    options
  );
  const parts = formattedDate.split(" ");
  return `${parts[0]} ${parts[1]}, ${parts[2]}`;
};

export { formatHelper };
