import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:playground_app/utiles/colors.dart';

String statusToString(num value) {
  if (value == 0) return "Zu prüfen";
  if (value == 1) return "Wird verkauft";
  if (value == 2) return "Eingereicht";
  return "Abgeschlossen";
}

Color statusToColor(num value) {
  if (value == 0) return COLOR5;
  if (value == 1) return COLOR3;
  if (value == 2) return CONFIRMED_COLOR;
  return COLOR1;
}

String readableTimeString(String createdAt) {
  DateTime createdAtDateTime = DateTime.parse(createdAt);
  String displayTime = DateFormat.EEEE().format(createdAtDateTime);
  if (DateTime.now().day == createdAtDateTime.day) {
    displayTime = "Today";
  } else if (DateTime.now().difference(createdAtDateTime).inDays > 7) {
    displayTime = DateFormat.MMMEd().format(createdAtDateTime);
  }
  return displayTime;
}
