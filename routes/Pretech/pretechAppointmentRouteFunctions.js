import prisma from "../../lib/prisma.js";

export const createPretechAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, comment } = req.body;
    const appointment = await prisma.pretechAppointmentModel.create({
      data: {
        name,
        email,
        phone,
        date,
        comment,
      },
    });
    res.status(201).json({ message: `Appointment created successfully. Your appointment is scheduled for ${date}.`, data: appointment })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePretechAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, date, service, comment } = req.body;
        const appointment = await prisma.pretechAppointmentModel.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                date,
                service,
                comment,
            },
        });
        res.status(200).json({ message: `Appointment updated successfully. Your appointment is scheduled for ${date}.`, data: appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deletePretechAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await prisma.pretechAppointmentModel.delete({
            where: { id },
        });
        res.status(200).json({ message: `Appointment deleted successfully.`, data: appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchPretechAppointments = async (req, res) => {
    try {
        const appointments = await prisma.pretechAppointmentModel.findMany();
        res.status(200).json({ data: appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchPretechAppointmentTimes = async (req, res) => {
  try {
    const appointmentTimes = await prisma.pretechAppointmentTime.findMany();
    res.status(200).json({ data: appointmentTimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPretechAppointmentTime = async (req, res) => {
  try {
    console.log(req.body);
    const { appointmentDate, startTime } = req.body;
    const appointmentDateObj = new Date(appointmentDate);
    const hours = parseInt(startTime.split(':')[0], 10);
    const minutes = parseInt(startTime.split(':')[1], 10);
    appointmentDateObj.setHours(hours, minutes, 0, 0);
    console.log(appointmentDateObj);
    const appointmentTime = await prisma.pretechAppointmentTime.create({
      data: {
        appointmentDate: appointmentDateObj,
      },
    });
    const allAppointmentTimes = await prisma.pretechAppointmentTime.findMany();
    res.status(201).json({ message: `Appointment time created successfully.`, data: allAppointmentTimes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePretechAppointmentTime = async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentTime = await prisma.pretechAppointmentTime.delete({
      where: { id },
    });
    const allAppointmentTimes = await prisma.pretechAppointmentTime.findMany();
    res.status(200).json({ message: `Appointment time deleted successfully.`, data: allAppointmentTimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};