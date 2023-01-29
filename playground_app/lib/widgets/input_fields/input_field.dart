import 'package:flutter/material.dart';
import 'package:playground_app/utiles/colors.dart';

class TextInputFieldStandart extends StatelessWidget {
  const TextInputFieldStandart(
      {this.hintText,
      this.suffixWidget,
      this.onChange,
      Key? key,
      this.disabled = false,
      this.controller})
      : super(key: key);

  final TextEditingController? controller;
  final Function? onChange;
  final String? hintText;
  final Widget? suffixWidget;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: IgnorePointer(
        ignoring: disabled,
        child: TextField(
            controller: controller,
            keyboardType: TextInputType.multiline,
            maxLines: 10,
            minLines: 3,
            onChanged: onChange != null ? (value) => onChange!(value) : null,
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.only(
                  bottom: 10.0, left: 8.0, top: 8, right: 8),
              floatingLabelBehavior: FloatingLabelBehavior.never,
              // border: InputBorder.none,

              alignLabelWithHint: true,
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1.0, color: PRIMARY_COLOR),
                borderRadius: BorderRadius.circular(12.0),
              ),
              border: OutlineInputBorder(
                borderSide:
                    const BorderSide(width: 1.0, color: NOT_ACTIVE_COLOR),
                borderRadius: BorderRadius.circular(12.0),
              ),
              hintText: hintText,
              hintStyle: const TextStyle(fontSize: 14),
              // contentPadding: const EdgeInsets.fromLTRB(0.0, 2.0, 0.0, 10.0)
            ),
            style: const TextStyle(
                fontSize: 14.0,
                color: PRIMARY_COLOR,
                fontWeight: FontWeight.w700)),
      ),
    );
  }
}

class NumberInputFieldStandart extends StatelessWidget {
  const NumberInputFieldStandart(
      {this.hintText,
      this.suffixWidget,
      this.onChange,
      Key? key,
      this.disabled = false,
      this.controller})
      : super(key: key);

  final TextEditingController? controller;
  final Function(double)? onChange;
  final String? hintText;
  final Widget? suffixWidget;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: IgnorePointer(
        ignoring: disabled,
        child: TextField(
            controller: controller,
            keyboardType: TextInputType.number,
            onChanged: onChange != null
                ? (value) =>
                    value != "" ? onChange!(double.parse(value)) : onChange!(0)
                : null,
            decoration: InputDecoration(
              isDense: true,
              contentPadding: const EdgeInsets.only(
                  bottom: 10.0, left: 8.0, top: 8, right: 8),
              floatingLabelBehavior: FloatingLabelBehavior.never,
              // border: InputBorder.none,

              alignLabelWithHint: true,
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1.0, color: PRIMARY_COLOR),
                borderRadius: BorderRadius.circular(12.0),
              ),
              border: OutlineInputBorder(
                borderSide:
                    const BorderSide(width: 1.0, color: NOT_ACTIVE_COLOR),
                borderRadius: BorderRadius.circular(12.0),
              ),
              hintText: hintText,
              hintStyle: const TextStyle(fontSize: 14),
              // contentPadding: const EdgeInsets.fromLTRB(0.0, 2.0, 0.0, 10.0)
            ),
            style: const TextStyle(
                fontSize: 14.0,
                color: PRIMARY_COLOR,
                fontWeight: FontWeight.w700)),
      ),
    );
  }
}
