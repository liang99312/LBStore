package com.lb.lbstore.util;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.QiYe;
import com.lb.lbstore.service.A01Service;
import com.lb.lbstore.service.QiYeService;
import com.lb.lbstore.service.impl.A01ServiceImpl;
import com.lb.lbstore.service.impl.QiYeServiceImpl;
import java.util.ArrayList;
import java.util.List;

public class DataUtil {

    public static List<QiYe> qiYes = new ArrayList<QiYe>();
    public static List<A01> a01s = new ArrayList<A01>();
    
    public static void getQiYesFromDb() {
        QiYeService qiYeService = (QiYeServiceImpl) ApplicationUtil.getBean("qiYeServiceImpl");
        qiYes.clear();
        qiYes.addAll((List<QiYe>) qiYeService.getAllQiYes());
    }

    public static void getA01sFromDb() {
        A01Service a01Service = (A01ServiceImpl) ApplicationUtil.getBean("a01ServiceImpl");
        a01s.clear();
        a01s.addAll((List<A01>) a01Service.getAllA01s());
    }

}
