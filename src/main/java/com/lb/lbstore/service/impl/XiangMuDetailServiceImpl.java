/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.XiangMuDetailDao;
import com.lb.lbstore.domain.XiangMuDetail;
import com.lb.lbstore.service.XiangMuDetailService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("xiangMuDetailServiceImpl")
public class XiangMuDetailServiceImpl implements XiangMuDetailService {

    @Autowired
    private XiangMuDetailDao xiangMuDetailDao;

    @Override
    public XiangMuDetail getXiangMuDetailById(Integer id) {
        return (XiangMuDetail) xiangMuDetailDao.findObjectById(XiangMuDetail.class, id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from XiangMuDetail xmd left join XiangMu xm on xmd.xm_id = xm.id where xmd.qy_id=?";
        if (map.containsKey("xmmc")) {
            sql += " and xm.mc like ?";
            parameters.add("%" + map.get("xmmc") + "%");
        }
        if (map.containsKey("xmlsh")) {
            sql += " and xm.lsh like ?";
            parameters.add("%" + map.get("xmlsh") + "%");
        }
        if (map.containsKey("lsh")) {
            sql += " and xmd.lsh like ?";
            parameters.add("%" + map.get("lsh") + "%");
        }
        if (map.containsKey("wzmc")) {
            sql += " and xmd.wzmc like ?";
            parameters.add("%" + map.get("wzmc") + "%");
        }
        if (map.containsKey("state")) {
            sql += " and xmd.state = ?";
            parameters.add(map.get("state"));
        }
        if (map.containsKey("kh_id")) {
            sql += " and xmd.kh_id = ?";
            parameters.add(map.get("kh_id"));
        }
        if (map.containsKey("qrq")) {
            sql += " and xm.kdsj >= ?";
            parameters.add(map.get("qrq"));
        }
        if (map.containsKey("zrq")) {
            sql += " and xm.kdsj <= ?";
            parameters.add(map.get("zrq") + " 23:59:59");
        }
        return xiangMuDetailDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<XiangMuDetail> queryXiangMuDetailsByPage(HashMap map) {
        return xiangMuDetailDao.queryXiangMuDetailsByPage(map);
    }

}
