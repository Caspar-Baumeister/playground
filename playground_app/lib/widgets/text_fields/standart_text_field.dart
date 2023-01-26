import 'package:flutter/material.dart';
import 'package:playground_app/utiles/colors.dart';
import 'package:playground_app/utiles/constants.dart';
import 'package:playground_app/utiles/text_styles.dart';

class StandartTextField extends StatelessWidget {
  const StandartTextField(
      {super.key, this.hintText = "", required this.controller});

  final String hintText;
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: STANDART_BUTTON_WIDTH,
      height: STANDART_BUTTON_HEIGHT,
      child: TextField(
          controller: controller,
          decoration: InputDecoration(
              alignLabelWithHint: true,
              floatingLabelBehavior: FloatingLabelBehavior.never,
              border: OutlineInputBorder(
                borderSide: const BorderSide(width: 1.0, color: PRIMARY_COLOR),
                borderRadius: BorderRadius.circular(12.0),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1.5, color: PRIMARY_COLOR),
                borderRadius: BorderRadius.circular(12.0),
              ),
              hintText: hintText,
              hintStyle: STANDART_DESCRIPTION,
              contentPadding: const EdgeInsets.fromLTRB(12.0, 2.0, 0.0, 10.0)),
          style: STANDART_DESCRIPTION),
    );
  }
}
