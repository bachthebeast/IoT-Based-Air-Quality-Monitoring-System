# IoT-Based-Air-Quality-Monitoring-System
An ESP32-powered environmental monitoring system for collecting, processing, and displaying real-time air quality data.
# IoT-Based Air Quality Monitoring System

**An ESP32-powered environmental monitoring system for collecting, processing, and displaying real-time air quality data.**

## 1. Project Overview

The IoT-Based Air Quality Monitoring System is an embedded environmental monitoring solution designed to collect multiple environmental parameters, process sensor readings locally, and provide accessible information about surrounding air conditions.

Built around the ESP32 microcontroller, the system integrates four environmental sensors to monitor temperature, relative humidity, atmospheric pressure, estimated altitude, and particulate matter concentrations. An onboard display presents updated measurements, while a preliminary air quality classification algorithm translates gas sensor readings into five categories.

The project also incorporates a Wi-Fi configuration mechanism and a JSON/HTTP-based communication module, establishing the foundation for future remote monitoring, historical data analysis, and environmental alert systems.

## 2. Project Objectives

- Monitor multiple environmental parameters through an integrated sensor network.
- Process sensor readings using an ESP32-based embedded system.
- Display environmental measurements and preliminary air quality classifications locally.
- Develop an IoT communication architecture for potential server integration.
- Establish a foundation for future environmental data visualization, trend analysis, and threshold-based alerts.

## 3. Key Features

### Multi-Parameter Environmental Monitoring

The system integrates four sensors to collect data across different environmental dimensions:

- **Temperature and Relative Humidity:** Measures ambient temperature and humidity using the SHT31 sensor.
- **Atmospheric Pressure and Estimated Altitude:** Uses the BMP280 sensor to measure atmospheric pressure and estimate altitude.
- **Gas Sensor Readings:** Collects analog signals from the MQ135 sensor for preliminary air quality classification.
- **Particulate Matter Monitoring:** Receives PM1.0, PM2.5, and PM10 readings from the ZH03B particulate matter sensor through UART communication.

### Preliminary Air Quality Classification

The system maps the MQ135-derived internal index to five predefined categories:

1. Excellent
2. Good
3. Moderate
4. Poor
5. Dangerous

These categories provide an initial interpretation of sensor readings. They are based on experimental thresholds defined in the software and are not equivalent to a standardized Air Quality Index (AQI).

### On-Device Data Visualization

An onboard display presents environmental measurements, including temperature, humidity, atmospheric pressure, estimated altitude, the MQ135-based classification, and PM2.5 readings.

The display is designed to refresh approximately every two seconds, allowing users to observe environmental changes without requiring a separate monitoring interface.

### Wi-Fi Connectivity and Server Integration

The project uses WiFiManager to simplify network configuration and support Wi-Fi connectivity.

A JSON-based data transmission module is designed to package device information, operating time, event information, and environmental measurements into structured payloads. The module uses HTTP POST requests to communicate with a configurable server API.

This architecture provides a foundation for future remote data access and centralized environmental monitoring.

## 4. Hardware Components

| Component | Function |
|---|---|
| ESP32 | Main microcontroller for sensor acquisition and embedded processing |
| SHT31 | Temperature and relative humidity measurement |
| BMP280 | Atmospheric pressure measurement and altitude estimation |
| MQ135 | Analog gas sensor readings for preliminary air quality classification |
| ZH03B | Particulate matter measurement, including PM1.0, PM2.5, and PM10 |
| Onboard Display | Local visualization of environmental measurements |

## 5. Software and Technologies

- **Embedded Programming:** C/C++
- **Microcontroller Platform:** ESP32
- **Sensor Communication:** I2C, UART, and analog-to-digital conversion (ADC)
- **Network Configuration:** WiFiManager
- **Data Serialization:** JSON
- **Communication Protocol:** HTTP
- **Server Integration:** REST-style API endpoint

## 6. System Architecture

The system follows a sensor-to-processing architecture in which environmental data is collected, processed locally, and presented to the user.

```text
Environmental Sensors
        |
        v
   ESP32 Controller
        |
        v
 Data Acquisition
        |
        v
 Data Processing
        |
        +----------------------+
        |                      |
        v                      v
 Onboard Display        JSON Data Packaging
                               |
                               v
                         HTTP POST Request
                               |
                               v
                           Server API
                               |
                               v
                    Potential Data Storage
                    and Historical Analysis
```

The server-side pathway represents the intended integration architecture. Automatic periodic transmission and server-side data storage require further implementation and testing.

## 7. Data Processing Workflow

The embedded software follows a recurring monitoring cycle:

1. **Initialization:** Initializes serial communication, sensor interfaces, the display, and Wi-Fi configuration.
2. **Sensor Acquisition:** Reads environmental measurements from the SHT31, BMP280, MQ135, and ZH03B sensors.
3. **Data Processing:** Updates sensor variables, estimates altitude, and maps the MQ135-derived index to a preliminary air quality category.
4. **Local Visualization:** Refreshes the onboard display with the latest available measurements.
5. **Data Transmission:** Prepares structured JSON payloads for HTTP communication with the configured server API.
6. **Cycle Repetition:** Waits approximately two seconds before repeating the monitoring cycle.

## 8. Environmental and Practical Impact

The project explores how accessible embedded systems and IoT technologies can support environmental awareness and data-driven monitoring.

Its potential applications include:

- **Localized Environmental Awareness:** Making air quality measurements more accessible in the immediate surroundings of the device.
- **Environmental Change Detection:** Helping users identify unusual variations in sensor readings and investigate potentially concerning conditions.
- **Smart Monitoring Infrastructure:** Providing a technical foundation for remote monitoring, historical trend analysis, and configurable alerts.
- **Educational Applications:** Demonstrating the integration of embedded programming, environmental sensing, data processing, and IoT communication in a practical engineering project.

The current system is a monitoring prototype and does not independently establish that an environment is safe or unsafe for human exposure.

## 9. Current Development Status

The current implementation establishes the core embedded monitoring workflow, including sensor initialization, environmental data acquisition, preliminary classification, and local display updates.

The software also defines a JSON/HTTP server communication module and a Wi-Fi configuration mechanism.

The following areas require additional implementation, validation, or testing:

- Integrating periodic server transmission into the main execution loop.
- Correcting and validating ZH03B UART frame parsing and buffer handling.
- Calibrating the MQ135 sensor and validating classification thresholds against reference measurements.
- Implementing robust handling of invalid sensor readings and communication failures.
- Improving network security and connection recovery for deployment beyond a local test network.

## 10. Future Improvements

Potential development directions include:

- **Remote Dashboard:** Build a web dashboard to visualize current readings and historical environmental trends.
- **Data Logging:** Store timestamped measurements for longitudinal analysis.
- **Threshold-Based Alerts:** Introduce configurable alerts when validated environmental thresholds are exceeded.
- **Sensor Calibration:** Compare readings against reference instruments and document measurement error.
- **Communication Reliability:** Add bounded retries, timeouts, and temporary data buffering during network outages.
- **Security Enhancements:** Introduce HTTPS, device authentication, and secure configuration management.
- **Advanced Analytics:** Explore time-series analysis to identify recurring environmental patterns.

## 11. Repository Goals

This project demonstrates an applied engineering approach to environmental monitoring by combining embedded systems, sensor integration, data processing, and IoT communication.

It is intended to evolve from a local monitoring prototype into a more reliable environmental data collection platform through iterative testing, calibration, and software development.

---

**Project Category:** Internet of Things (IoT) · Embedded Systems · Environmental Monitoring

**Core Technologies:** ESP32 · C/C++ · Environmental Sensors · Wi-Fi · JSON · HTTP
