class Ticket {
  int? id;
  int? shopId;
  int? posId;
  int? responsibleUserId;

  int? status;
  num? startMoney;
  num? endMoney;

  String? date;
  String? startComment;
  String? midComment;
  String? endComment;

  POSModel? pos;
  ResponsibleUser? responsibleUser;

  String? createdAt;
  String? updatedAt;

  Ticket(
      {this.id,
      this.date,
      this.responsibleUserId,
      this.responsibleUser,
      this.status,
      this.startMoney,
      this.endMoney,
      this.startComment,
      this.endComment,
      this.posId,
      this.pos,
      this.shopId,
      this.createdAt,
      this.updatedAt,
      this.midComment});

  Ticket.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    date = json['date'];
    responsibleUserId = json['responsibleUserId'];
    responsibleUser = json['responsibleUser'] != null
        ? ResponsibleUser.fromJson(json['responsibleUser'])
        : null;
    status = json['status'];
    startMoney = json['startMoney'];
    endMoney = json['endMoney'];
    startComment = json['startComment'];
    endComment = json['endComment'];
    posId = json['posId'];
    pos = json['pos'] != null ? POSModel.fromJson(json['pos']) : null;
    shopId = json['shopId'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    midComment = json['midComment'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['date'] = date;
    data['responsibleUserId'] = responsibleUserId;
    if (responsibleUser != null) {
      data['responsibleUser'] = responsibleUser!.toJson();
    }
    data['status'] = status;
    data['startMoney'] = startMoney;
    data['endMoney'] = endMoney;
    data['startComment'] = startComment;
    data['endComment'] = endComment;
    data['posId'] = posId;
    if (pos != null) {
      data['pos'] = pos!.toJson();
    }
    data['shopId'] = shopId;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['midComment'] = midComment;
    return data;
  }
}

class ResponsibleUser {
  int? id;
  String? name;

  ResponsibleUser({this.id, this.name});

  ResponsibleUser.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    return data;
  }
}

class POSModel {
  int? id;
  String? name;

  POSModel({this.id, this.name});

  POSModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    return data;
  }
}
